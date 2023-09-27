const User = require('../models/user');
const path = require('path');
exports.getIndex = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'Views', 'index.html'));
};
exports.postData = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const p_no = req.body.phone_no;
    const email = req.body.email;
    const user = new User(null, name, p_no, email);
    User.create({
        Name: name,
        phone_no: p_no,
        Email: email,
    }).then(result => {
        res.redirect('/')
    }).catch(err => {
        console.log(err);
    })
}
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            const userData = users.map(user => user.dataValues);
            res.json(userData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error fetching users' });
        });
};

exports.dataUsers = async (req, res, next) => {
    try {
        let id = req.body.userId;
        const deletedUser = await User.destroy({
            where: {
                id: id
            }
        });

        if (deletedUser > 0) {
            res.json({ message: 'User deleted successfully', userId: id });
        } else {
            res.status(404).json({ message: 'User not found', userId: id });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

exports.updateUsers = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const name = req.body.name;
        const phoneNo = req.body.phone_no;
        const email = req.body.email;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', userId });
        }
        user.Name = name;
        user.phone_no = phoneNo;
        user.Email = email;
        await user.save();
        return res.json({ message: 'User updated successfully', userId });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Error updating user' });
    }
};

