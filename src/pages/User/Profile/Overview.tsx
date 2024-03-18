interface Props {
  username: string;
  email: string;
  insdate: string;
}

export const Overview = ({ username, email, insdate }: Props) => {
  return (
      <div className='tab-content pt-2'>
      <div
        className='tab-pane fade show active profile-overview'
        id='profile-overview'
      >
        <h5 className='card-title'></h5>
        <div className='row'>
          <div className='col-lg-3 col-md-4 label '>아이디</div>
          <div className='col-lg-9 col-md-8'>{username}</div>
        </div>
        <div className='row'>
          <div className='col-lg-3 col-md-4 label'>이메일</div>
          <div className='col-lg-9 col-md-8'>{email}</div>
        </div>
        <div className='row'>
          <div className='col-lg-3 col-md-4 label'>가입 일자</div>
          <div className='col-lg-9 col-md-8'>{insdate}</div>
        </div>
      </div>
      </div>
  );
};
