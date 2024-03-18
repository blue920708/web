import { Link } from 'react-router-dom';

interface Props {
  path: string;
  pageTitle: string;
  className: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem = ({
  path,
  pageTitle,
  className,
  isActive,
  onClick,
}: Props) => {
  return (
    <>
      <li className='nav-item'>
        <Link
          className={isActive ? 'nav-link ' : 'nav-link  collapsed'}
          to={path}
          onClick={onClick}
        >
          <i className={className}></i>
          <span>{pageTitle}</span>
        </Link>
      </li>
    </>
  );
};
