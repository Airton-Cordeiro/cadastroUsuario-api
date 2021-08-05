import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'; 

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }    
},
{
    timestamps: true,
});

User.plugin(mongoosePaginate)

export default mongoose.model('user', User);