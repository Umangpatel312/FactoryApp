import { ComponentPropsWithoutRef } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faBuilding,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleNotch,
  faCircleXmark,
  faEnvelope,
  faLanguage,
  faLink,
  faListCheck,
  faMagnifyingGlass,
  faMapLocationDot,
  faMoon,
  faPaintBrush,
  faPencil,
  faPhone,
  faPuzzlePiece,
  faRightFromBracket,
  faRightToBracket,
  faSliders,
  faSun,
  faTrash,
  faUsers,
  faXmark,
  faGears,
  faDownload,
  faPlus,
  faTimes,
  faCamera,
  faFilter,
  faList,
  faInbox,
  faUndo,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

/**
 * A union type of all Font Awesome icon names (without the `fa-` prefix)
 * used in the application.
 */
export type FAIconName =
  | 'bars'
  | 'building'
  | 'camera'
  | 'calendar'
  | 'check'
  | 'chevronDown'
  | 'chevronUp'
  | 'circleCheck'
  | 'circleExclamation'
  | 'circleInfo'
  | 'circleNotch'
  | 'circleRegular'
  | 'circleXmark'
  | 'download'
  | 'envelope'
  | 'filter'
  | 'inbox'
  | 'gears'
  | 'language'
  | 'link'
  | 'list'
  | 'listCheck'
  | 'magnifyingGlass'
  | 'mapLocationDot'
  | 'moon'
  | 'paintbrush'
  | 'pencil'
  | 'phone'
  | 'plus'
  | 'puzzlePiece'
  | 'rightFromBracket'
  | 'rightToBracket'
  | 'search'
  | 'sliders'
  | 'sun'
  | 'time'
  | 'trash'
  | 'undo'
  | 'users'
  | 'xmark';

/**
 * Properties for the `FAIcon` component.
 * @param {FAIconName} icon - The icon name.
 * @see {@link BaseComponentProps}
 * @see {@link FontAwesomeIcon}
 */
export interface FAIconProps
  extends BaseComponentProps,
  Omit<ComponentPropsWithoutRef<typeof FontAwesomeIcon>, 'icon'> {
  icon: FAIconName;
}

/**
 * A key/value mapping of every icon used in the application.
 */
const icons: Record<FAIconName, IconProp> = {
  bars: faBars,
  building: faBuilding,
  camera: faCamera,
  calendar: faCalendar,
  check: faCheck,
  chevronDown: faChevronDown,
  chevronUp: faChevronUp,
  circleCheck: faCircleCheck,
  circleExclamation: faCircleExclamation,
  circleInfo: faCircleInfo,
  circleNotch: faCircleNotch,
  circleRegular: faCircleRegular,
  circleXmark: faCircleXmark,
  download: faDownload,
  envelope: faEnvelope,
  filter: faFilter,
  gears: faGears,
  inbox: faInbox,
  language: faLanguage,
  link: faLink,
  list: faList,
  listCheck: faListCheck,
  magnifyingGlass: faMagnifyingGlass,
  mapLocationDot: faMapLocationDot,
  moon: faMoon,
  paintbrush: faPaintBrush,
  pencil: faPencil,
  phone: faPhone,
  plus: faPlus,
  puzzlePiece: faPuzzlePiece,
  rightFromBracket: faRightFromBracket,
  rightToBracket: faRightToBracket,
  search: faSearch,
  sliders: faSliders,
  sun: faSun,
  time: faTimes,
  trash: faTrash,
  undo: faUndo,
  users: faUsers,
  xmark: faXmark
};

/**
 * The `FAIcon` component renders a Font Awesome icon.
 *
 * Note: Wraps the `FontAwesomeIcon` component.
 * @param param0
 * @returns
 */
const FAIcon = ({
  className,
  icon,
  testId = 'fa-icon',
  ...iconProps
}: FAIconProps): JSX.Element => {
  const faIcon = icons[icon];

  return (
    <FontAwesomeIcon
      className={classNames('fa-icon', className)}
      icon={faIcon}
      {...iconProps}
      data-testid={testId}
    />
  );
};

export default FAIcon;
