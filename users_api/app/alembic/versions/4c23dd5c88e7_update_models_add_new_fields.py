"""update models + add new fields

Revision ID: 4c23dd5c88e7
Revises: e2412789c190
Create Date: 2024-08-02 15:46:29.866452

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = '4c23dd5c88e7'
down_revision: Union[str, None] = 'e2412789c190'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Users',
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('nom', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('prenom', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('birthday', sa.Date(), nullable=True),
    sa.Column('sexe', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('password', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.PrimaryKeyConstraint('user_id')
    )
    op.create_index(op.f('ix_Users_email'), 'Users', ['email'], unique=True)
    op.create_table('MovieUsers',
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('note', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['Users.user_id'], ),
    sa.PrimaryKeyConstraint('movie_id')
    )
    op.create_table('UserGenre',
    sa.Column('genre_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['Users.user_id'], ),
    sa.PrimaryKeyConstraint('genre_id')
    )
    op.drop_table('medialike')
    op.drop_index('ix_user_email', table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('email', sa.VARCHAR(), nullable=False),
    sa.Column('is_active', sa.BOOLEAN(), nullable=False),
    sa.Column('is_superuser', sa.BOOLEAN(), nullable=False),
    sa.Column('full_name', sa.VARCHAR(), nullable=True),
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('hashed_password', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_user_email', 'user', ['email'], unique=1)
    op.create_table('medialike',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('media_id', sa.VARCHAR(), nullable=True),
    sa.Column('media_type', sa.VARCHAR(), nullable=False),
    sa.Column('owner_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('UserGenre')
    op.drop_table('MovieUsers')
    op.drop_index(op.f('ix_Users_email'), table_name='Users')
    op.drop_table('Users')
    # ### end Alembic commands ###
