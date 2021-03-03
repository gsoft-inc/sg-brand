import { ElementType } from "react";
import { createIcon } from "./Icon";
import { createMultiVariantIcon } from "./MultiVariantIcon";

export * from "./Icon";
export * from "./MultiVariantIcon";
export * from "./IconList";
export * from "./EmbeddedIcon";

function createOrbitIcon(source: ElementType, displayName: string) {
    const Component = createIcon(source);
    Component.displayName = displayName;

    return Component;
}

function createOrbitMultiVariantIcon(source24: ElementType, source32: ElementType, displayName: string) {
    const Component = createMultiVariantIcon(source24, source32);
    Component.displayName = displayName;

    return Component;
}

import { ReactComponent as InnerAddIcon24 } from "@orbit-ui/icons/dist/icon-add-24.svg";
import { ReactComponent as InnerAddIcon32 } from "@orbit-ui/icons/dist/icon-add-32.svg";
import { ReactComponent as InnerArrowIcon24 } from "@orbit-ui/icons/dist/icon-arrow-24.svg";
import { ReactComponent as InnerArrowIcon32 } from "@orbit-ui/icons/dist/icon-arrow-32.svg";
import { ReactComponent as InnerCalendarIcon24 } from "@orbit-ui/icons/dist/icon-calendar-24.svg";
import { ReactComponent as InnerCalendarIcon32 } from "@orbit-ui/icons/dist/icon-calendar-32.svg";
import { ReactComponent as InnerCarretIcon24 } from "@orbit-ui/icons/dist/icon-carret-24.svg";
import { ReactComponent as InnerCarretIcon32 } from "@orbit-ui/icons/dist/icon-carret-32.svg";
import { ReactComponent as InnerCheckCircleIcon24 } from "@orbit-ui/icons/dist/icon-check-circle-24.svg";
import { ReactComponent as InnerCheckCircleIcon32 } from "@orbit-ui/icons/dist/icon-check-circle-32.svg";
import { ReactComponent as InnerCheckIcon24 } from "@orbit-ui/icons/dist/icon-check-24.svg";
import { ReactComponent as InnerCheckIcon32 } from "@orbit-ui/icons/dist/icon-check-32.svg";
import { ReactComponent as InnerChevronIcon24 } from "@orbit-ui/icons/dist/icon-chevron-24.svg";
import { ReactComponent as InnerChevronIcon32 } from "@orbit-ui/icons/dist/icon-chevron-32.svg";
import { ReactComponent as InnerClearFilterIcon24 } from "@orbit-ui/icons/dist/icon-clear-filter-24.svg";
import { ReactComponent as InnerClearFilterIcon32 } from "@orbit-ui/icons/dist/icon-clear-filter-32.svg";
import { ReactComponent as InnerCrossIcon24 } from "@orbit-ui/icons/dist/icon-cross-24.svg";
import { ReactComponent as InnerCrossIcon32 } from "@orbit-ui/icons/dist/icon-cross-32.svg";
import { ReactComponent as InnerCsvIcon24 } from "@orbit-ui/icons/dist/icon-csv-24.svg";
import { ReactComponent as InnerCsvIcon32 } from "@orbit-ui/icons/dist/icon-csv-32.svg";
import { ReactComponent as InnerDashIcon24 } from "@orbit-ui/icons/dist/icon-dash-24.svg";
import { ReactComponent as InnerDashIcon32 } from "@orbit-ui/icons/dist/icon-dash-32.svg";
import { ReactComponent as InnerDownloadIcon24 } from "@orbit-ui/icons/dist/icon-download-24.svg";
import { ReactComponent as InnerDownloadIcon32 } from "@orbit-ui/icons/dist/icon-download-32.svg";
import { ReactComponent as InnerEditIcon24 } from "@orbit-ui/icons/dist/icon-edit-24.svg";
import { ReactComponent as InnerEditIcon32 } from "@orbit-ui/icons/dist/icon-edit-32.svg";
import { ReactComponent as InnerEmailIcon24 } from "@orbit-ui/icons/dist/icon-email-24.svg";
import { ReactComponent as InnerEmailIcon32 } from "@orbit-ui/icons/dist/icon-email-32.svg";
import { ReactComponent as InnerEmailReminderIcon24 } from "@orbit-ui/icons/dist/icon-email-reminder-24.svg";
import { ReactComponent as InnerEmailReminderIcon32 } from "@orbit-ui/icons/dist/icon-email-reminder-32.svg";
import { ReactComponent as InnerEyeIcon24 } from "@orbit-ui/icons/dist/icon-eye-24.svg";
import { ReactComponent as InnerEyeIcon32 } from "@orbit-ui/icons/dist/icon-eye-32.svg";
import { ReactComponent as InnerFileIcon24 } from "@orbit-ui/icons/dist/icon-file-24.svg";
import { ReactComponent as InnerFileIcon32 } from "@orbit-ui/icons/dist/icon-file-32.svg";
import { ReactComponent as InnerFilterIcon24 } from "@orbit-ui/icons/dist/icon-filter-24.svg";
import { ReactComponent as InnerFilterIcon32 } from "@orbit-ui/icons/dist/icon-filter-32.svg";
import { ReactComponent as InnerFlagIcon24 } from "@orbit-ui/icons/dist/icon-flag-24.svg";
import { ReactComponent as InnerFlagIcon32 } from "@orbit-ui/icons/dist/icon-flag-32.svg";
import { ReactComponent as InnerFolderIcon24 } from "@orbit-ui/icons/dist/icon-folder-24.svg";
import { ReactComponent as InnerFolderIcon32 } from "@orbit-ui/icons/dist/icon-folder-32.svg";
import { ReactComponent as InnerGearIcon24 } from "@orbit-ui/icons/dist/icon-gear-24.svg";
import { ReactComponent as InnerGearIcon32 } from "@orbit-ui/icons/dist/icon-gear-32.svg";
import { ReactComponent as InnerGroupIcon24 } from "@orbit-ui/icons/dist/icon-group-24.svg";
import { ReactComponent as InnerGroupIcon32 } from "@orbit-ui/icons/dist/icon-group-32.svg";
import { ReactComponent as InnerGuestAddIcon24 } from "@orbit-ui/icons/dist/icon-guest-add-24.svg";
import { ReactComponent as InnerGuestAddIcon32 } from "@orbit-ui/icons/dist/icon-guest-add-32.svg";
import { ReactComponent as InnerGuestRemoveIcon24 } from "@orbit-ui/icons/dist/icon-guest-remove-24.svg";
import { ReactComponent as InnerGuestRemoveIcon32 } from "@orbit-ui/icons/dist/icon-guest-remove-32.svg";
import { ReactComponent as InnerHelpIcon24 } from "@orbit-ui/icons/dist/icon-help-24.svg";
import { ReactComponent as InnerHelpIcon32 } from "@orbit-ui/icons/dist/icon-help-32.svg";
import { ReactComponent as InnerHorizontalDotsIcon24 } from "@orbit-ui/icons/dist/icon-horizontal-dots-24.svg";
import { ReactComponent as InnerHorizontalDotsIcon32 } from "@orbit-ui/icons/dist/icon-horizontal-dots-32.svg";
import { ReactComponent as InnerImageIcon24 } from "@orbit-ui/icons/dist/icon-image-24.svg";
import { ReactComponent as InnerImageIcon32 } from "@orbit-ui/icons/dist/icon-image-32.svg";
import { ReactComponent as InnerInfoIcon24 } from "@orbit-ui/icons/dist/icon-info-24.svg";
import { ReactComponent as InnerInfoIcon32 } from "@orbit-ui/icons/dist/icon-info-32.svg";
import { ReactComponent as InnerLightbulbIcon24 } from "@orbit-ui/icons/dist/icon-lightbulb-24.svg";
import { ReactComponent as InnerLightbulbIcon32 } from "@orbit-ui/icons/dist/icon-lightbulb-32.svg";
import { ReactComponent as InnerMagnifierIcon24 } from "@orbit-ui/icons/dist/icon-magnifier-24.svg";
import { ReactComponent as InnerMagnifierIcon32 } from "@orbit-ui/icons/dist/icon-magnifier-32.svg";
import { ReactComponent as InnerMusicIcon24 } from "@orbit-ui/icons/dist/icon-music-24.svg";
import { ReactComponent as InnerMusicIcon32 } from "@orbit-ui/icons/dist/icon-music-32.svg";
import { ReactComponent as InnerNotificationIcon24 } from "@orbit-ui/icons/dist/icon-notification-24.svg";
import { ReactComponent as InnerNotificationIcon32 } from "@orbit-ui/icons/dist/icon-notification-32.svg";
import { ReactComponent as InnerNotificationOffIcon24 } from "@orbit-ui/icons/dist/icon-notification-off-24.svg";
import { ReactComponent as InnerNotificationOffIcon32 } from "@orbit-ui/icons/dist/icon-notification-off-32.svg";
import { ReactComponent as InnerPdfIcon24 } from "@orbit-ui/icons/dist/icon-pdf-24.svg";
import { ReactComponent as InnerPdfIcon32 } from "@orbit-ui/icons/dist/icon-pdf-32.svg";
import { ReactComponent as InnerPrinterIcon24 } from "@orbit-ui/icons/dist/icon-printer-24.svg";
import { ReactComponent as InnerPrinterIcon32 } from "@orbit-ui/icons/dist/icon-printer-32.svg";
import { ReactComponent as InnerPrivacyIcon24 } from "@orbit-ui/icons/dist/icon-privacy-24.svg";
import { ReactComponent as InnerPrivacyIcon32 } from "@orbit-ui/icons/dist/icon-privacy-32.svg";
import { ReactComponent as InnerSignoutIcon24 } from "@orbit-ui/icons/dist/icon-signout-24.svg";
import { ReactComponent as InnerSignoutIcon32 } from "@orbit-ui/icons/dist/icon-signout-32.svg";
import { ReactComponent as InnerSlashIcon24 } from "@orbit-ui/icons/dist/icon-slash-24.svg";
import { ReactComponent as InnerSlashIcon32 } from "@orbit-ui/icons/dist/icon-slash-32.svg";
import { ReactComponent as InnerSortIcon24 } from "@orbit-ui/icons/dist/icon-sort-24.svg";
import { ReactComponent as InnerSortIcon32 } from "@orbit-ui/icons/dist/icon-sort-32.svg";
import { ReactComponent as InnerTrashIcon24 } from "@orbit-ui/icons/dist/icon-trash-24.svg";
import { ReactComponent as InnerTrashIcon32 } from "@orbit-ui/icons/dist/icon-trash-32.svg";
import { ReactComponent as InnerUserAddIcon24 } from "@orbit-ui/icons/dist/icon-user-add-24.svg";
import { ReactComponent as InnerUserAddIcon32 } from "@orbit-ui/icons/dist/icon-user-add-32.svg";
import { ReactComponent as InnerUserRemoveIcon24 } from "@orbit-ui/icons/dist/icon-user-remove-24.svg";
import { ReactComponent as InnerUserRemoveIcon32 } from "@orbit-ui/icons/dist/icon-user-remove-32.svg";
import { ReactComponent as InnerVerticalDotsIcon24 } from "@orbit-ui/icons/dist/icon-vertical-dots-24.svg";
import { ReactComponent as InnerVerticalDotsIcon32 } from "@orbit-ui/icons/dist/icon-vertical-dots-32.svg";
import { ReactComponent as InnerVideoIcon24 } from "@orbit-ui/icons/dist/icon-video-24.svg";
import { ReactComponent as InnerVideoIcon32 } from "@orbit-ui/icons/dist/icon-video-32.svg";
import { ReactComponent as InnerWarningIcon24 } from "@orbit-ui/icons/dist/icon-warning-24.svg";
import { ReactComponent as InnerWarningIcon32 } from "@orbit-ui/icons/dist/icon-warning-32.svg";
import { ReactComponent as InnerZipIcon24 } from "@orbit-ui/icons/dist/icon-zip-24.svg";
import { ReactComponent as InnerZipIcon32 } from "@orbit-ui/icons/dist/icon-zip-32.svg";

export const AddIcon24 = createOrbitIcon(InnerAddIcon24, "AddIcon24");
export const AddIcon32 = createOrbitIcon(InnerAddIcon32, "AddIcon32");
export const ArrowIcon24 = createOrbitIcon(InnerArrowIcon24, "ArrowIcon24");
export const ArrowIcon32 = createOrbitIcon(InnerArrowIcon32, "ArrowIcon32");
export const CalendarIcon24 = createOrbitIcon(InnerCalendarIcon24, "CalendarIcon24");
export const CalendarIcon32 = createOrbitIcon(InnerCalendarIcon32, "CalendarIcon32");
export const CarretIcon24 = createOrbitIcon(InnerCarretIcon24, "CarretIcon24");
export const CarretIcon32 = createOrbitIcon(InnerCarretIcon32, "CarretIcon32");
export const CheckIcon24 = createOrbitIcon(InnerCheckIcon24, "CheckIcon24");
export const CheckIcon32 = createOrbitIcon(InnerCheckIcon32, "CheckIcon32");
export const CheckCircleIcon24 = createOrbitIcon(InnerCheckCircleIcon24, "CheckCircleIcon24");
export const CheckCircleIcon32 = createOrbitIcon(InnerCheckCircleIcon32, "CheckCircleIcon32");
export const ChevronIcon24 = createOrbitIcon(InnerChevronIcon24, "ChevronIcon24");
export const ChevronIcon32 = createOrbitIcon(InnerChevronIcon32, "ChevronIcon32");
export const ClearFilterIcon24 = createOrbitIcon(InnerClearFilterIcon24, "ClearFilterIcon24");
export const ClearFilterIcon32 = createOrbitIcon(InnerClearFilterIcon32, "ClearFilterIcon32");
export const CrossIcon24 = createOrbitIcon(InnerCrossIcon24, "CrossIcon24");
export const CrossIcon32 = createOrbitIcon(InnerCrossIcon32, "CrossIcon32");
export const CsvIcon24 = createOrbitIcon(InnerCsvIcon24, "CsvIcon24");
export const CsvIcon32 = createOrbitIcon(InnerCsvIcon32, "CsvIcon32");
export const DashIcon24 = createOrbitIcon(InnerDashIcon24, "DashIcon24");
export const DashIcon32 = createOrbitIcon(InnerDashIcon32, "DashIcon32");
export const DownloadIcon24 = createOrbitIcon(InnerDownloadIcon24, "DownloadIcon24");
export const DownloadIcon32 = createOrbitIcon(InnerDownloadIcon32, "DownloadIcon32");
export const EditIcon24 = createOrbitIcon(InnerEditIcon24, "EditIcon24");
export const EditIcon32 = createOrbitIcon(InnerEditIcon32, "EditIcon32");
export const EmailIcon24 = createOrbitIcon(InnerEmailIcon24, "EmailIcon24");
export const EmailIcon32 = createOrbitIcon(InnerEmailIcon32, "EmailIcon32");
export const EmailReminderIcon24 = createOrbitIcon(InnerEmailReminderIcon24, "EmailReminderIcon24");
export const EmailReminderIcon32 = createOrbitIcon(InnerEmailReminderIcon32, "EmailReminderIcon32");
export const EyeIcon24 = createOrbitIcon(InnerEyeIcon24, "EyeIcon24");
export const EyeIcon32 = createOrbitIcon(InnerEyeIcon32, "EyeIcon32");
export const FileIcon24 = createOrbitIcon(InnerFileIcon24, "FileIcon24");
export const FileIcon32 = createOrbitIcon(InnerFileIcon32, "FileIcon32");
export const FilterIcon24 = createOrbitIcon(InnerFilterIcon24, "FilterIcon24");
export const FilterIcon32 = createOrbitIcon(InnerFilterIcon32, "FilterIcon32");
export const FlagIcon24 = createOrbitIcon(InnerFlagIcon24, "FlagIcon24");
export const FlagIcon32 = createOrbitIcon(InnerFlagIcon32, "FlagIcon32");
export const FolderIcon24 = createOrbitIcon(InnerFolderIcon24, "FolderIcon24");
export const FolderIcon32 = createOrbitIcon(InnerFolderIcon32, "FolderIcon32");
export const GearIcon24 = createOrbitIcon(InnerGearIcon24, "GearIcon24");
export const GearIcon32 = createOrbitIcon(InnerGearIcon32, "GearIcon32");
export const GroupIcon24 = createOrbitIcon(InnerGroupIcon24, "GroupIcon24");
export const GroupIcon32 = createOrbitIcon(InnerGroupIcon32, "GroupIcon32");
export const GuestAddIcon24 = createOrbitIcon(InnerGuestAddIcon24, "GuestAddIcon24");
export const GuestAddIcon32 = createOrbitIcon(InnerGuestAddIcon32, "GuestAddIcon32");
export const GuestRemoveIcon24 = createOrbitIcon(InnerGuestRemoveIcon24, "GuestRemoveIcon24");
export const GuestRemoveIcon32 = createOrbitIcon(InnerGuestRemoveIcon32, "GuestRemoveIcon32");
export const HelpIcon24 = createOrbitIcon(InnerHelpIcon24, "HelpIcon24");
export const HelpIcon32 = createOrbitIcon(InnerHelpIcon32, "HelpIcon32");
export const HorizontalDotsIcon24 = createOrbitIcon(InnerHorizontalDotsIcon24, "HorizontalDotsIcon24");
export const HorizontalDotsIcon32 = createOrbitIcon(InnerHorizontalDotsIcon32, "HorizontalDotsIcon32");
export const ImageIcon24 = createOrbitIcon(InnerImageIcon24, "ImageIcon24");
export const ImageIcon32 = createOrbitIcon(InnerImageIcon32, "ImageIcon32");
export const InfoIcon24 = createOrbitIcon(InnerInfoIcon24, "InfoIcon24");
export const InfoIcon32 = createOrbitIcon(InnerInfoIcon32, "InfoIcon32");
export const LightbulbIcon24 = createOrbitIcon(InnerLightbulbIcon24, "LightbulbIcon24");
export const LightbulbIcon32 = createOrbitIcon(InnerLightbulbIcon32, "LightbulbIcon32");
export const MagnifierIcon24 = createOrbitIcon(InnerMagnifierIcon24, "MagnifierIcon24");
export const MagnifierIcon32 = createOrbitIcon(InnerMagnifierIcon32, "MagnifierIcon32");
export const MusicIcon24 = createOrbitIcon(InnerMusicIcon24, "MusicIcon24");
export const MusicIcon32 = createOrbitIcon(InnerMusicIcon32, "MusicIcon32");
export const NotificationIcon24 = createOrbitIcon(InnerNotificationIcon24, "NotificationIcon24");
export const NotificationIcon32 = createOrbitIcon(InnerNotificationIcon32, "NotificationIcon32");
export const NotificationOffIcon24 = createOrbitIcon(InnerNotificationOffIcon24, "NotificationOffIcon24");
export const NotificationOffIcon32 = createOrbitIcon(InnerNotificationOffIcon32, "NotificationOffIcon32");
export const PdfIcon24 = createOrbitIcon(InnerPdfIcon24, "PdfIcon24");
export const PdfIcon32 = createOrbitIcon(InnerPdfIcon32, "PdfIcon32");
export const PrinterIcon24 = createOrbitIcon(InnerPrinterIcon24, "PrinterIcon24");
export const PrinterIcon32 = createOrbitIcon(InnerPrinterIcon32, "PrinterIcon32");
export const PrivacyIcon24 = createOrbitIcon(InnerPrivacyIcon24, "PrivacyIcon24");
export const PrivacyIcon32 = createOrbitIcon(InnerPrivacyIcon32, "PrivacyIcon32");
export const SignoutIcon24 = createOrbitIcon(InnerSignoutIcon24, "SignoutIcon24");
export const SignoutIcon32 = createOrbitIcon(InnerSignoutIcon32, "SignoutIcon32");
export const SortIcon24 = createOrbitIcon(InnerSortIcon24, "SortIcon24");
export const SortIcon32 = createOrbitIcon(InnerSortIcon32, "SortIcon32");
export const SlashIcon24 = createOrbitIcon(InnerSlashIcon24, "SlashIcon24");
export const SlashIcon32 = createOrbitIcon(InnerSlashIcon32, "SlashIcon32");
export const TrashIcon24 = createOrbitIcon(InnerTrashIcon24, "TrashIcon24");
export const TrashIcon32 = createOrbitIcon(InnerTrashIcon32, "TrashIcon32");
export const UserAddIcon24 = createOrbitIcon(InnerUserAddIcon24, "UserAddIcon24");
export const UserAddIcon32 = createOrbitIcon(InnerUserAddIcon32, "UserAddIcon32");
export const UserRemoveIcon24 = createOrbitIcon(InnerUserRemoveIcon24, "UserRemoveIcon24");
export const UserRemoveIcon32 = createOrbitIcon(InnerUserRemoveIcon32, "UserRemoveIcon32");
export const VerticalDotsIcon24 = createOrbitIcon(InnerVerticalDotsIcon24, "VerticalDotsIcon24");
export const VerticalDotsIcon32 = createOrbitIcon(InnerVerticalDotsIcon32, "VerticalDotsIcon32");
export const VideoIcon24 = createOrbitIcon(InnerVideoIcon24, "VideoIcon24");
export const VideoIcon32 = createOrbitIcon(InnerVideoIcon32, "VideoIcon32");
export const WarningIcon24 = createOrbitIcon(InnerWarningIcon24, "WarningIcon24");
export const WarningIcon32 = createOrbitIcon(InnerWarningIcon32, "WarningIcon32");
export const ZipIcon24 = createOrbitIcon(InnerZipIcon24, "ZipIcon24");
export const ZipIcon32 = createOrbitIcon(InnerZipIcon32, "ZipIcon32");

export const AddIcon = createOrbitMultiVariantIcon(InnerAddIcon24, InnerAddIcon32, "AddIcon");
export const ArrowIcon = createOrbitMultiVariantIcon(InnerArrowIcon24, InnerArrowIcon32, "ArrowIcon");
export const CalendarIcon = createOrbitMultiVariantIcon(InnerCalendarIcon24, InnerCalendarIcon32, "CalendarIcon");
export const CarretIcon = createOrbitMultiVariantIcon(InnerCarretIcon24, InnerCarretIcon32, "CarretIcon");
export const CheckIcon = createOrbitMultiVariantIcon(InnerCheckIcon24, InnerCheckIcon32, "CheckIcon");
export const CheckCircleIcon = createOrbitMultiVariantIcon(InnerCheckCircleIcon24, InnerCheckCircleIcon32, "CheckCircleIcon");
export const ChevronIcon = createOrbitMultiVariantIcon(InnerChevronIcon24, InnerChevronIcon32, "ChevronIcon");
export const ClearFilterIcon = createOrbitMultiVariantIcon(InnerClearFilterIcon24, InnerClearFilterIcon32, "ClearFilterIcon");
export const CrossIcon = createOrbitMultiVariantIcon(InnerCrossIcon24, InnerCrossIcon32, "CrossIcon");
export const CsvIcon = createOrbitMultiVariantIcon(InnerCsvIcon24, InnerCsvIcon32, "CsvIcon");
export const DashIcon = createOrbitMultiVariantIcon(InnerDashIcon24, InnerDashIcon32, "DashIcon");
export const DownloadIcon = createOrbitMultiVariantIcon(InnerDownloadIcon24, InnerDownloadIcon32, "DownloadIcon");
export const EditIcon = createOrbitMultiVariantIcon(InnerEditIcon24, InnerEditIcon32, "EditIcon");
export const EmailIcon = createOrbitMultiVariantIcon(InnerEmailIcon24, InnerEmailIcon32, "EmailIcon");
export const EmailReminderIcon = createOrbitMultiVariantIcon(InnerEmailReminderIcon24, InnerEmailReminderIcon32, "EmailReminderIcon");
export const EyeIcon = createOrbitMultiVariantIcon(InnerEyeIcon24, InnerEyeIcon32, "EyeIcon");
export const FileIcon = createOrbitMultiVariantIcon(InnerFileIcon24, InnerFileIcon32, "FileIcon");
export const FilterIcon = createOrbitMultiVariantIcon(InnerFilterIcon24, InnerFilterIcon32, "FilterIcon");
export const FlagIcon = createOrbitMultiVariantIcon(InnerFlagIcon24, InnerFlagIcon32, "FlagIcon");
export const FolderIcon = createOrbitMultiVariantIcon(InnerFolderIcon24, InnerFolderIcon32, "FolderIcon");
export const GearIcon = createOrbitMultiVariantIcon(InnerGearIcon24, InnerGearIcon32, "GearIcon");
export const GroupIcon = createOrbitMultiVariantIcon(InnerGroupIcon24, InnerGroupIcon32, "GroupIcon");
export const GuestAddIcon = createOrbitMultiVariantIcon(InnerGuestAddIcon24, InnerGuestAddIcon32, "GuestAddIcon");
export const GuestRemoveIcon = createOrbitMultiVariantIcon(InnerGuestRemoveIcon24, InnerGuestRemoveIcon32, "GuestRemoveIcon");
export const HelpIcon = createOrbitMultiVariantIcon(InnerHelpIcon24, InnerHelpIcon32, "HelpIcon");
export const HorizontalDotsIcon = createOrbitMultiVariantIcon(InnerHorizontalDotsIcon24, InnerHorizontalDotsIcon32, "HorizontalDotsIcon");
export const ImageIcon = createOrbitMultiVariantIcon(InnerImageIcon24, InnerImageIcon32, "ImageIcon");
export const InfoIcon = createOrbitMultiVariantIcon(InnerInfoIcon24, InnerInfoIcon32, "InfoIcon");
export const LightbulbIcon = createOrbitMultiVariantIcon(InnerLightbulbIcon24, InnerLightbulbIcon32, "LightbulbIcon");
export const MagnifierIcon = createOrbitMultiVariantIcon(InnerMagnifierIcon24, InnerMagnifierIcon32, "MagnifierIcon");
export const MusicIcon = createOrbitMultiVariantIcon(InnerMusicIcon24, InnerMusicIcon32, "MusicIcon");
export const NotificationIcon = createOrbitMultiVariantIcon(InnerNotificationIcon24, InnerNotificationIcon32, "NotificationIcon");
export const NotificationOffIcon = createOrbitMultiVariantIcon(InnerNotificationOffIcon24, InnerNotificationOffIcon32, "NotificationOffIcon");
export const PdfIcon = createOrbitMultiVariantIcon(InnerPdfIcon24, InnerPdfIcon32, "PdfIcon");
export const PrinterIcon = createOrbitMultiVariantIcon(InnerPrinterIcon24, InnerPrinterIcon32, "PrinterIcon");
export const PrivacyIcon = createOrbitMultiVariantIcon(InnerPrivacyIcon24, InnerPrivacyIcon32, "PrivacyIcon");
export const SignoutIcon = createOrbitMultiVariantIcon(InnerSignoutIcon24, InnerSignoutIcon32, "SignoutIcon");
export const SortIcon = createOrbitMultiVariantIcon(InnerSortIcon24, InnerSortIcon32, "SortIcon");
export const SlashIcon = createOrbitMultiVariantIcon(InnerSlashIcon24, InnerSlashIcon32, "SlashIcon");
export const TrashIcon = createOrbitMultiVariantIcon(InnerTrashIcon24, InnerTrashIcon32, "TrashIcon");
export const UserAddIcon = createOrbitMultiVariantIcon(InnerUserAddIcon24, InnerUserAddIcon32, "UserAddIcon");
export const UserRemoveIcon = createOrbitMultiVariantIcon(InnerUserRemoveIcon24, InnerUserRemoveIcon32, "UserRemoveIcon");
export const VerticalDotsIcon = createOrbitMultiVariantIcon(InnerVerticalDotsIcon24, InnerVerticalDotsIcon32, "VerticalDotsIcon");
export const VideoIcon = createOrbitMultiVariantIcon(InnerVideoIcon24, InnerVideoIcon32, "VideoIcon");
export const WarningIcon = createOrbitMultiVariantIcon(InnerWarningIcon24, InnerWarningIcon32, "WarningIcon");
export const ZipIcon = createOrbitMultiVariantIcon(InnerZipIcon24, InnerZipIcon32, "ZipIcon");
