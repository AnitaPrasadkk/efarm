export interface UserList {
    id: string;
    userName: string,
    latitude: string,
    longitude: string,
    postType: string,
    productType: string,
    subType: string,
    status?: any,
    quantity: string
}
export interface addPostReq {
    id?: string;
    userName: string,
    latitude: number,
    longitude: number,
    postType: string,
    productType: string,
    subType: string,
    quantity: string,
    name: string
}
export interface UpdatePostReq {
    id: string;
    userName: string,
    latitude: string,
    longitude: string,
    postType: string,
    productType: string,
    subType: string,
    quantity: string,
    name: string
}
export interface CoOrdinatesMarker {
    latitude: number,
    longitude: number,
    zoom: number,
    draggable: boolean
}
export interface NotificationType {
    postedUserName: string,
    latitude: string,
    notficationDate: string,
    receiverUserName: string,
    longitude: string
}
export interface ModalResponseType {
    isSuccess: boolean,
    actionType: string
}