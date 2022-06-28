module.exports = async (sequelize, DataTypes) => {
    return sequelize.define('user_sessions', {
        session_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4()
        },
        session_init: {
            type: DataTypes.INET,
            allowNull: false,
        },
        session_user_agent: {
            type: DataTypes.STRING(128),
            allowNull: false,
        }
    })
}