import { nanoid } from "nanoid";

 
export const ImageReducer=(image, action)=> {
    switch (action.type) {
      case 'add': {
        return [
          {
            image: action.image,
            url : action.url,
          },
        ];
      }
    //   case 'changed': {
    //     return ticket.map((t) => {
    //       if (t.id === action.editcomp.id) {
    //         return action.editcomp;
    //       } else {
    //         return t;
    //       }
    //     });
    //   }
    //   case 'deleted': {
    //     return editcomp.filter((t) => t.id !== action.id);
    //   }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }