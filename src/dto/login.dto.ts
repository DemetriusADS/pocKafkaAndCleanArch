export interface LoginRequestDTO {
  email: string
  password: string
}

export interface LoginResponseDTO {
  token: string
}

export interface LoginNotifyMessageDTO {
  text: string
  email: string
  time: Date
}
