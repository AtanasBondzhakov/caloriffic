import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

export default function CustomButton({
    handleClick,
    label,
    type,
    className,
    loading,
}) {
    return (
        <Stack spacing={2} direction="column">
            <Button
                className={className}
                type={type}
                variant="contained"
                onClick={handleClick}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <CircularProgress size={20} sx={{ color: 'black', marginRight: 1 }} />
                        Loading...
                    </>
                ) : (
                    label
                )}
            </Button>
        </Stack>
    );
}