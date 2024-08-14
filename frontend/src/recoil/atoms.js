
import { atom } from 'recoil';
import { selector } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: null, 
});

export const ClassRooms=atom({
  key:'ClassRooms',
  default:[]
})

export const Teachers=atom({
  key:'Teachers',
  default:[]
})

export const Student=atom({
  key:'Student',
  default:[]
})

export const UnassignedTeachers = selector({
  key: 'UnassignedTeachers',
  get: ({ get }) => {
    const teachers = get(Teachers);
    const classrooms = get(ClassRooms);

    // Create a set of all assigned teacher IDs
    const assignedTeacherIds = new Set();
    classrooms.forEach(classroom => {
      
      
    });

    // Filter teachers to get those not in the assignedTeacherIds set
    const unassignedTeachers = teachers.filter(teacher => !assignedTeacherIds.has(teacher._id));
    return unassignedTeachers
    
  },
});


