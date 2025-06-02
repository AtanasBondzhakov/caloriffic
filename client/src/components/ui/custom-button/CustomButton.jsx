import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CustomButton({
    handleClick,
    label,
    type
}) {
    return (
        <Stack spacing={2} direction="column">
            <Button
                type={type}
                variant="contained"
                sx={{ backgroundColor: '#5380bb', width: '100%' }}
                onClick={handleClick}
            >
                {label}
            </Button>
        </Stack>
    );
}