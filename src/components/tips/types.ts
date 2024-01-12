export enum TipsType {
  confirm,
  info,
  toast
}

export interface DialogOptions {
  title?: string,
  description?: string,
  okText?: string,
  cancelText?: string,
  onOKPress?: () => void;
  onCancelPress?: () => void;
  onDismiss?: () => void;
  destroyDialog?: () => void;
  contentView?: Element;
  okTextColor?: string;
  cancelTextColor?: string;
}
