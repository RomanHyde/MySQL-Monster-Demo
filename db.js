const {Sequelize, DataTypes, Op} = require("sequelize");
const sequelize = new Sequelize("mysql://root:PASSWORD@localhost:3306/Master24");

const Location = sequelize.define("location", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

const Monster = sequelize.define("monster", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    location_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "locations",
            key: "id"
        }
    }
});


const run = async() => {
    try {
        // Authenticate
        await sequelize.authenticate();
        //Create tables
        await sequelize.sync();

        const york = await Location.create({name: "York"});
        const dickTurpin = await Monster.create({name: "Dick Turpin", location_id: york.id})
        const monster = await Monster.findOne({
            where: {
                location_id: 1
            }
        });
        console.log(monster);
        // console.log(york);
        // console.log(dickTurpin);

        await sequelize.close();
    } catch (error){
        console.log(error);
    }
};

run();