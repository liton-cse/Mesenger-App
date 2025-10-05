//Login type...
export interface LoginPayload {
  email: string;
  password: string;
  fcmToken: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  isOnline: string;
  fcmToken?: string;
  lastSeen?: string;
  MessageRequestStatus: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
}

export interface AuthResponse {
  user: UserData;
  token: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface LoginAuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
  user: UserData | null;
  users: UserData[];
}

//forget password interface...

export interface ForgetAuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
}

export interface forgetPayload {
  email: string;
}
// verify Otp...
export interface verifyEmailAuthState {
  email: string;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface verifyOtpPayload {
  email: string;
  oneTimeCode?: number;
}

// resetPassword
export interface ResetPasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  token: string;
}
