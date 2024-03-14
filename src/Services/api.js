import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const setTokenHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post('/api/users/register', data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const loginUser = async (data) => {
    try {
      const response = await axiosInstance.post('/api/users/login', data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

const updatePost = async (postId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/posts/${postId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export {
  setTokenHeader,
  fetchPosts,
  registerUser,
  loginUser,
  updatePost,
  deletePost
};
