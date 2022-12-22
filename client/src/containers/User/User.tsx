import { Button, UserInfo, UserProfile } from '@/components';
import { userState } from '@/states';
import { useRecoilState } from 'recoil';
import styles from './User.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBind, updateProfile } from '@/api';

interface UserProps {
  _id: string;
  userId: string;
  imageURL?: string;
  postCnt: string;
  binder: [{ _id: string; userId: string; imageURL?: string }];
  binding: [{ _id: string; userId: string; imageURL?: string }];
  isBinding: boolean;
}

export const User = ({ userInfo }: { userInfo: UserProps }) => {
  const [user] = useRecoilState(userState);
  const router = useRouter();
  const patchBind = useMutation(updateBind);
  const patchProfile = useMutation(updateProfile);
  const queryClient = useQueryClient();

  const handleBind = () => {
    patchBind.mutate(
      {
        id: userInfo._id,
        type: userInfo.isBinding ? 'unbind' : 'bind',
      },
      {
        onSuccess() {
          queryClient.invalidateQueries();
        },
      }
    );
  };

  const handleProfile = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const [profile] = target.files as FileList;

    const formData = new FormData();
    formData.append('profile', profile);
    patchProfile.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries();
        target.files = null;
      },
    });
  };

  return (
    <div className={styles.conatiner}>
      <UserProfile
        size="big"
        id={userInfo.userId}
        imageURL={userInfo.imageURL}
      />
      <div className={styles.wrapper}>
        <UserInfo
          postCnt={userInfo.postCnt}
          binder={userInfo.binder}
          binding={userInfo.binding}
        />
        {user._id !== userInfo._id ? (
          <div className={styles.buttons}>
            {userInfo.isBinding ? (
              <Button
                size="small"
                content="바인딩"
                className="transition-all bg-gradient-to-r from-black to-black text-white dark:from-white dark:to-white dark:text-black"
                onClick={handleBind}
              />
            ) : (
              <Button size="small" content="바인드" onClick={handleBind} />
            )}

            <Button
              size="small"
              content="채팅"
              onClick={() => router.push(`/chat/${userInfo._id}`)}
            />
          </div>
        ) : (
          <>
            <Button
              as={'label'}
              size="long"
              content="프로필 편집"
              htmlFor="profile"
            />
            <input
              type="file"
              id="profile"
              name="profile"
              className="sr-only"
              accept="image/*"
              onChange={handleProfile}
            />
          </>
        )}
      </div>
    </div>
  );
};
