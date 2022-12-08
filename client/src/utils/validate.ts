interface isValidateProps {
  userId: string;
  password: string;
  conformPassword?: string;
}

export const isValidate = ({
  userId,
  password,
  conformPassword,
}: isValidateProps) => {
  if (!conformPassword) {
    return !(
      /^[a-z][a-z0-9_]{4,11}$/.test(userId) &&
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(password)
    );
  }
  return !(
    /^[a-z][a-z0-9_]{4,11}$/.test(userId) &&
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(password) &&
    password === conformPassword
  );
};
