// src/recoil/atoms.js
import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: null, // Default state for authentication (e.g., null or empty object)
});

export const ClassRooms=atom({
  key:'ClassRooms',
  default:[]
})