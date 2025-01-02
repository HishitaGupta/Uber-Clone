import React, { useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const CaptainProtected = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return; // Prevent further execution if token is missing
    }

    const fetchCaptainData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.captain) {
          setCaptain(response.data.captain);
        } else {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainData();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default CaptainProtected;
