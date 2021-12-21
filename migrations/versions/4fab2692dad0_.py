"""empty message

Revision ID: 4fab2692dad0
Revises: 
Create Date: 2021-12-20 09:26:43.834020

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4fab2692dad0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('appointment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('appointment', sa.String(), nullable=False),
    sa.Column('time_start', sa.DateTime(), nullable=False),
    sa.Column('time_ends', sa.DateTime(), nullable=False),
    sa.Column('ubication', sa.String(), nullable=False),
    sa.Column('notes', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('habits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('habits', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('home',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('humedity_and_temperature',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time_stamp', sa.DateTime(), nullable=False),
    sa.Column('temperature', sa.Float(), nullable=False),
    sa.Column('humedity', sa.Float(), nullable=False),
    sa.Column('home_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['home_id'], ['home.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('member',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('photo_user', sa.String(), nullable=False),
    sa.Column('birth_date', sa.Date(), nullable=False),
    sa.Column('home_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['home_id'], ['home.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('photo_user'),
    sa.UniqueConstraint('username')
    )
    op.create_table('sokect',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('state', sa.Boolean(), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('home_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['home_id'], ['home.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('to_do_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('task', sa.String(), nullable=False),
    sa.Column('done', sa.Boolean(), nullable=False),
    sa.Column('home_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['home_id'], ['home.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('task')
    )
    op.create_table('appointment_member',
    sa.Column('member', sa.Integer(), nullable=False),
    sa.Column('appointment', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['appointment'], ['appointment.id'], ),
    sa.ForeignKeyConstraint(['member'], ['member.id'], ),
    sa.PrimaryKeyConstraint('member', 'appointment')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('appointment_member')
    op.drop_table('to_do_list')
    op.drop_table('sokect')
    op.drop_table('member')
    op.drop_table('humedity_and_temperature')
    op.drop_table('home')
    op.drop_table('habits')
    op.drop_table('appointment')
    # ### end Alembic commands ###
