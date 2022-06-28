module.exports = async(sequelize, DataTypes) => {
    return sequelize.define('users', {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4(),
            // autoIncrement: true,
            // field: 'id'
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_login: {
            type: DataTypes.STRING(32),
            is: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
            allowNull: false,
            unique: true
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}