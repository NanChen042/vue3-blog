import type { ApiResponse } from '@/types';

// Normally this would be: 
// return request.post('/login', data);
// But for simulation, we will mock the backend logic since the local backend router doesn't exist yet.

export function login(data: any) {
  return new Promise<ApiResponse<any>>((resolve, reject) => {
    setTimeout(() => {
      if (data.username === 'admin' && data.password === '123456') {
        resolve({
          code: 200,
          data: {
            token: 'mock-jwt-token-9876543210',
            userInfo: {
              id: 1,
              username: 'admin',
              nickname: 'Super Admin',
              role: 'Developer',
              avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            }
          },
          message: 'Login successful'
        });
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ message: 'Invalid username or password' });
      }
    }, 600);
  });
}
