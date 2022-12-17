interface isValidateProps {
  userId: string;
  password: string;
  confirmPassword?: string;
}

export const isValidate = ({
  userId,
  password,
  confirmPassword,
}: isValidateProps) => {
  if (confirmPassword !== undefined) {
    return !(
      /^[a-z0-9_]{5,12}$/.test(userId) &&
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(password) &&
      password === confirmPassword
    );
  }
  return !(
    /^[a-z0-9_]{5,12}$/.test(userId) &&
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(password)
  );
};
