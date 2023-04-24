export async function getUserInfo() {
  try {
    const response = await fetch('/api/users/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('회원정보를 가져오는 중 오류가 발생했습니다.');
  }
}
