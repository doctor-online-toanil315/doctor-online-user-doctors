import { Client } from '@stomp/stompjs';

interface ParamsType {
  requestType: '0' | '1';
  pageSize: number;
  statusRead?: boolean;
}

let params: { requestType: '0' | '1'; pageSize: number; statusRead?: boolean } =
  {
    requestType: '0',
    pageSize: 10,
  };
let clientWebSocket: Client = {} as Client;
let userIdWebSocket = '';

export const sendMessageInit = (client: Client, userId: string) => {
  clientWebSocket = client;
  userIdWebSocket = userId;
  params = { ...params, pageSize: 10 };
  send(params);
};
export const sendMessage = (type: 'type' | 'status' | 'more' | 'default') => {
  switch (type) {
    case 'type':
      params = {
        ...params,
        requestType: params.requestType === '0' ? '1' : '0',
        pageSize: 10,
      };
      break;
    case 'status':
      params.pageSize = 10;
      if (params.statusRead === false) delete params.statusRead;
      else params.statusRead = false;
      break;
    case 'more':
      params = { ...params, pageSize: params.pageSize + 10 };
      break;
    case 'default':
      break;
  }
  send(params);
};
const send = (params: ParamsType) => {
  clientWebSocket.publish({
    destination: '/ws/get-notify-websocket',
    body: JSON.stringify({
      userId: userIdWebSocket,
      ...params,
    }),
  });
};
export const isNotEmptyArray = (array: any) => {
  return Array.isArray(array) && array.length;
};
