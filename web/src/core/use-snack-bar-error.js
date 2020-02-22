import { useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

const SNACKBAR_OPTS = { style: { backgroundColor: '#f44336' } };

export function useSnackbarError(error) {
  const [openSnackbar, closeSnackbar] = useSnackbar(SNACKBAR_OPTS);

  useEffect(() => {
    if (error) {
      openSnackbar(error);
    } else {
      closeSnackbar();
    }
  }, [error]); // eslint-disable-line
}
