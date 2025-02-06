import { useCallback, useReducer } from "react"

type Toast = {
  id: string
  message: string
  type?: "success" | "error" | "info" | "warning"
  autoDismiss?: number
  dismissed?: boolean
}

type ActionType = {
  ADD_TOAST: "ADD_TOAST"
  UPDATE_TOAST: "UPDATE_TOAST"
  DISMISS_TOAST: "DISMISS_TOAST"
  REMOVE_TOAST: "REMOVE_TOAST"
}

const actionTypes: ActionType = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

type State = {
  toasts: Toast[]
}

type Action =
  | { type: ActionType["ADD_TOAST"]; payload: Omit<Toast, "id"> }
  | { type: ActionType["UPDATE_TOAST"]; payload: Partial<Toast> & { id: string } }
  | { type: ActionType["DISMISS_TOAST"]; payload: string }
  | { type: ActionType["REMOVE_TOAST"]; payload: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Math.random().toString(36).substring(2) }],
      }
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((toast) => (toast.id === action.payload.id ? { ...toast, ...action.payload } : toast)),
      }
    case actionTypes.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((toast) => (toast.id === action.payload ? { ...toast, dismissed: true } : toast)),
      }
    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      }
    default:
      return state
  }
}

const useToast = (): {
  addToast: (toast: Omit<Toast, "id">) => void
  updateToast: (payload: Partial<Toast> & { id: string }) => void
  dismissToast: (id: string) => void
  removeToast: (id: string) => void
  toasts: Toast[]
} => {
  const [state, dispatch] = useReducer(reducer, { toasts: [] })

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    dispatch({ type: actionTypes.ADD_TOAST, payload: toast })
  }, [])

  const updateToast = useCallback((payload: Partial<Toast> & { id: string }) => {
    dispatch({ type: actionTypes.UPDATE_TOAST, payload })
  }, [])

  const dismissToast = useCallback((id: string) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, payload: id })
  }, [])

  const removeToast = useCallback((id: string) => {
    dispatch({ type: actionTypes.REMOVE_TOAST, payload: id })
  }, [])

  return {
    addToast,
    updateToast,
    dismissToast,
    removeToast,
    toasts: state.toasts,
  }
}

export default useToast