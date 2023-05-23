import { nanoid } from "nanoid";

 
export const ImageUpdateReducer=(state, action)=> {
    switch (action.type) {
      case 'add': {
        // alert(JSON.stringify(action.data))
        return action.data

      }
      case 'deleteimg':{
        // alert(action.id)
                return state.filter((t) => t.imgid !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }