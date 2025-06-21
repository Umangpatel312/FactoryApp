import { ComponentPropsWithoutRef } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faCircle as faCircleRegular, faImage, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
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
  faSearch,
  faHandHoldingDollar,
  faMoneyBill,
  faFileInvoice,
  faUniversalAccess
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
  | 'fileInvoice'
  | 'inbox'
  | 'image'
  | 'gears'
  | 'language'
  | 'link'
  | 'list'
  | 'listCheck'
  | 'magnifyingGlass'
  | 'mapLocationDot'
  | 'moon'
  | 'moneyBill'
  | 'paintbrush'
  | 'pencil'
  | 'penToSquare'
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
  | 'universalAccess'
  | 'xmark'
  | 'handHoldingDollar';

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
  fileInvoice: faFileInvoice,
  gears: faGears,
  image: faImage,
  inbox: faInbox,
  language: faLanguage,
  link: faLink,
  list: faList,
  listCheck: faListCheck,
  magnifyingGlass: faMagnifyingGlass,
  mapLocationDot: faMapLocationDot,
  moon: faMoon,
  moneyBill: faMoneyBill,
  paintbrush: faPaintBrush,
  pencil: faPencil,
  penToSquare: faPenToSquare,
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
  universalAccess: faUniversalAccess,
  xmark: faXmark,
  handHoldingDollar: faHandHoldingDollar
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
