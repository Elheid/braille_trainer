import React from 'react';
import { Box } from '@mui/material';

interface AttemptsProps {
    attempts: number;
    maxAttempts: number;
}

const Attempts: React.FC<AttemptsProps> = React.memo(({ attempts, maxAttempts}) => {
    
    return (
        <Box display="flex">
            {[...Array(maxAttempts)].map((_, index) => (
                <Box
                    key={index}
                    width={"2vh"}
                    height={"2vh"}
                    sx={{
                        borderRadius: '50%',
                        backgroundColor: index < attempts ? '#A8EF25' : 'gray',
                        marginRight: index < maxAttempts - 1 ? 1 : 0,
                    }}
                />
            ))}
        </Box>
    );
});

export default Attempts;
