const deleteUser = async (userInfo) => {
  try {
    const response = await fetch('/api/users/delete', {
      method: 'DELETE',
    });

    if (response.status === 200) {
      console.log('유저 정보 삭제 완료');
    }
  } catch (error) {
    console.error(error);
  }
};

export default deleteUser;
