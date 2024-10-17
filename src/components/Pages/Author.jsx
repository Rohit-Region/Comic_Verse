import React, { useEffect } from 'react';
import { authorDetails } from '../../slice/AuthorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Author = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get LoginData and authorData from Redux state
  const { LoginData } = useSelector((state) => state.login);
  const { authorData } = useSelector((state) => state.author);  // <-- Moved this outside of useEffect

  // Fetch author details when LoginData.authorId changes
  useEffect(() => {
    if (LoginData?.authorId) {
      dispatch(authorDetails(LoginData.authorId));
    }
  }, [dispatch, LoginData.authorId]);

  const baseURL = "http://localhost:3002/";

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <h2>RECENTLY ADDED COMICS:</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {authorData?.comics && authorData.comics.length > 0 ? (
          authorData.comics.map((comic, index) => (
            <div
              style={{ backgroundColor: 'purple', borderRadius: '10px' }}
              key={index}
              onClick={() => navigate(`/comic_page/${comic.comicId}`)}
            >
              <div>
                <img
                  src={`${baseURL}${comic.image.path}`}
                  alt={comic.originalname}
                  style={{ borderRadius: '10px', width: '200px', height: '200px' }} 
                />
                <div>Name: {comic.comic_name}</div>
              </div>
            </div>
          ))
        ) : (
          <h1>No Data</h1>
        )}
      </div>
    </div>
  );
};

export default Author;
