import { DataTypes, type Sequelize, Model } from 'sequelize';

interface CaterAttributes {
  name: string;
  location: string;
  website: string;
}
interface CaterCreation extends CaterAttributes {}

export class Caterer
  extends Model<CaterAttributes, CaterCreation>
  implements CaterAttributes
{
  name!: string;
  location!: string;
  website!: string;
}

export function CatererFactory(sequelize: Sequelize): typeof Caterer {
  Caterer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          usUrl: true,
        },
      },
    },
    {
      modelName: 'caterers',
      sequelize,
    }
  );
  return Caterer;
}
