"""empty message

Revision ID: ecd8f202ccaf
Revises:
Create Date: 2024-04-04 14:46:41.454519

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ecd8f202ccaf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('stocks',
    sa.Column('ticker', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('market_cap', sa.Float(), nullable=True),
    sa.Column('shares_outstanding', sa.Float(), nullable=True),
    sa.Column('past_year_return', sa.Float(), nullable=True),
    sa.Column('past_outperformance', sa.Float(), nullable=True),
    sa.Column('trailing_pe', sa.Float(), nullable=True),
    sa.Column('forward_pe', sa.Float(), nullable=True),
    sa.Column('pb', sa.Float(), nullable=True),
    sa.Column('dividend_yield', sa.Float(), nullable=True),
    sa.Column('recommendation', sa.String(), nullable=True),
    sa.Column('target_mean', sa.Float(), nullable=True),
    sa.Column('short_interest', sa.Float(), nullable=True),
    sa.Column('fifty_two_high', sa.Float(), nullable=True),
    sa.Column('distance_to_52_high', sa.Float(), nullable=True),
    sa.Column('fifty_two_low', sa.Float(), nullable=True),
    sa.Column('distance_to_52_low', sa.Float(), nullable=True),
    sa.Column('industry', sa.String(), nullable=True),
    sa.Column('sector', sa.String(), nullable=True),
    sa.Column('past_day_return', sa.Float(), nullable=True),
    sa.Column('past_month_return', sa.Float(), nullable=True),
    sa.Column('avg_volume', sa.Float(), nullable=True),
    sa.Column('_info', sa.JSON(), nullable=True),
    sa.Column('_history', sa.JSON(), nullable=True),
    sa.PrimaryKeyConstraint('ticker')
    )
    op.create_table('markets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticker', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('past_year_return', sa.Float(), nullable=True),
    sa.Column('fifty_two_high', sa.Float(), nullable=True),
    sa.Column('distance_to_52_high', sa.Float(), nullable=True),
    sa.Column('fifty_two_low', sa.Float(), nullable=True),
    sa.Column('distance_to_52_low', sa.Float(), nullable=True),
    sa.Column('past_day_return', sa.Float(), nullable=True),
    sa.Column('past_month_return', sa.Float(), nullable=True),
    sa.Column('_info', sa.JSON(), nullable=True),
    sa.Column('_history', sa.JSON(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('list_number', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('portfolios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('cash', sa.Float(), nullable=True),
    sa.Column('order_number', sa.Integer(), nullable=True),
    sa.Column('value', sa.Float, nullable=True),
    sa.Column('_history', sa.JSON, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('portfolios')
    op.drop_table('users')
    op.drop_table('markets')
    op.drop_table('stocks')
    # ### end Alembic commands ###
