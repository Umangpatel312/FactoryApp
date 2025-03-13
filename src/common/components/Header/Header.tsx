import { Link } from 'react-router-dom';
import { PropsWithTestId } from '@leanstacks/react-common';

import { useAuth } from 'common/hooks/useAuth';
import logo from './logo.png';
// import ThemeToggle from 'common/components/Button/ThemeToggle';
import AppMenu from './AppMenu';
import MenuButton from 'common/components/Menu/MenuButton';
// import LanguageToggle from 'common/components/Button/LanguageToggle';
import { usePage } from 'common/hooks/usePage';
import Text from 'common/components/Text/Text';


/**
 * Properties for the `Header` component.
 * @see {@link PropsWithTestId}
 */
interface HeaderProps extends PropsWithTestId { }

/**
 * The `Header` React component renders a top navigation bar for pages.
 * @param {HeaderProps} [props] - Component properties, `HeaderProps`.
 * @returns {JSX.Element} JSX
 * @see {@link HeaderProps}
 */
const Header = ({ testId = 'header' }: HeaderProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { pageTitle } = usePage();


  return (
    <header
      className="flex h-16 items-center justify-between border-b border-b-neutral-500 border-opacity-30 bg-neutral-100 px-4 dark:border-opacity-50 dark:bg-neutral-900"
      data-testid={testId}
    >
      <div className="flex items-center">
        <Link to={isAuthenticated ? '/app' : '/'}>
          {/* <img src={logo} alt="Logo" height="32" width="32" /> */}
        </Link>
        <Text variant="heading1" className='ml-4'>
          {pageTitle}
        </Text>
        {/* <div className="border-b border-neutral-500/50 text-4xl">{pageTitle}</div> */}
      </div>
      <div className="flex items-center">
        {/* <LanguageToggle /> */}
        {/* <ThemeToggle /> */}
        <MenuButton Menu={AppMenu} />
      </div>
    </header>
  );
};

export default Header;
