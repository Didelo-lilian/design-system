import type { SvgIconComponent } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LinkIcon from "@mui/icons-material/Link";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import UploadIcon from "@mui/icons-material/Upload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningIcon from "@mui/icons-material/Warning";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export const iconNames = [
  "add",
  "arrow-back",
  "arrow-downward",
  "arrow-forward",
  "arrow-upward",
  "cancel",
  "check",
  "check-circle",
  "chevron-left",
  "chevron-right",
  "close",
  "content-copy",
  "delete",
  "download",
  "edit",
  "error",
  "expand-less",
  "expand-more",
  "favorite",
  "filter-list",
  "help",
  "home",
  "info",
  "link",
  "lock",
  "logout",
  "mail",
  "menu",
  "more-vert",
  "notifications",
  "person",
  "refresh",
  "remove",
  "search",
  "settings",
  "share",
  "star",
  "upload",
  "visibility",
  "visibility-off",
  "warning",
] as const;

export type IconName = (typeof iconNames)[number];

const icons: Record<IconName, SvgIconComponent> = {
  add: AddIcon,
  "arrow-back": ArrowBackIcon,
  "arrow-downward": ArrowDownwardIcon,
  "arrow-forward": ArrowForwardIcon,
  "arrow-upward": ArrowUpwardIcon,
  cancel: CancelIcon,
  check: CheckIcon,
  "check-circle": CheckCircleIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  close: CloseIcon,
  "content-copy": ContentCopyIcon,
  delete: DeleteIcon,
  download: DownloadIcon,
  edit: EditIcon,
  error: ErrorIcon,
  "expand-less": ExpandLessIcon,
  "expand-more": ExpandMoreIcon,
  favorite: FavoriteIcon,
  "filter-list": FilterListIcon,
  help: HelpIcon,
  home: HomeIcon,
  info: InfoIcon,
  link: LinkIcon,
  lock: LockIcon,
  logout: LogoutIcon,
  mail: MailIcon,
  menu: MenuIcon,
  "more-vert": MoreVertIcon,
  notifications: NotificationsIcon,
  person: PersonIcon,
  refresh: RefreshIcon,
  remove: RemoveIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  share: ShareIcon,
  star: StarIcon,
  upload: UploadIcon,
  visibility: VisibilityIcon,
  "visibility-off": VisibilityOffIcon,
  warning: WarningIcon,
};

export type IconProps = Omit<
  SvgIconProps,
  "children" | "component" | "fontSize"
> & {
  name: IconName;
  size?: "small" | "medium" | "large";
};

/**
 * Material icon from a curated set, drawn by `@mui/icons-material`. Decorative (`aria-hidden`) unless `titleAccess` is set,
 * which labels it as an `img`. `size` follows the theme font sizes and `color` the theme palette.
 */
export const Icon = ({ name, size = "medium", ...props }: IconProps) => {
  const Component = icons[name];
  return <Component fontSize={size} {...props} />;
};
