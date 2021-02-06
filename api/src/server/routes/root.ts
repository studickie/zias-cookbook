import catchAsync from '../helpers/catchAsync';

export const sendMail = catchAsync(async (req, res) => {
    
    
    res.status(200).json({ "message": "Good Check" });
});