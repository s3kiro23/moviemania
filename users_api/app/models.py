from sqlmodel import Field, Relationship, SQLModel
from pydantic import EmailStr
from datetime import date
from typing import List, Optional


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True)
    nom: str | None = None
    prenom: str | None = None
    birthday: date | None = None
    sexe: str | None = None
    is_active: bool = True
    is_superuser: bool = False


class GenresBase(SQLModel):
    genre_id: int
    name: str


class Genres(GenresBase, table=True):
    __tablename__ = "Genres"
    genre_id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str] = Field(default=None, max_length=255)


class MoviesBase(SQLModel):
    movie_id: int
    overview: str
    title: str
    poster_path: str
    backdrop_path: str
    release_date: date
    budget: int
    revenue: int
    runtime: int
    vote_average: float
    vote_count: int
    tagline: str
    adult: bool


class Movies(MoviesBase, table=True):
    __tablename__ = "Movies"
    movie_id: Optional[int] = Field(default=None, primary_key=True)
    overview: Optional[str] = Field(default=None, max_length=255)
    title: Optional[str] = Field(default=None, max_length=255)
    poster_path: Optional[str] = Field(default=None, max_length=255)
    backdrop_path: Optional[str] = Field(default=None, max_length=255)
    release_date: Optional[date] = None
    budget: Optional[int] = None
    revenue: Optional[int] = None
    runtime: Optional[int] = None
    vote_average: Optional[float] = None
    vote_count: Optional[int] = None
    tagline: Optional[str] = Field(default=None, max_length=255)
    adult: Optional[bool] = None


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str
    genres: List[int] = []


class UserCreateOpen(SQLModel):
    email: EmailStr
    password: str
    genres: List[int] = []


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = None  # type: ignore
    password: str | None = None


class UserUpdateMe(SQLModel):
    email: EmailStr | None = None  # type: ignore
    nom: str | None = None
    prenom: str | None = None
    birthday: date | None = None
    sexe: str | None = None


class UpdatePassword(SQLModel):
    current_password: str
    new_password: str


# Database model, database table inferred from class name
class User(UserBase, table=True):
    __tablename__ = "Users"
    user_id: int | None = Field(default=None, primary_key=True)
    password: str


# Properties to return via API, id is always required
class UserOut(UserBase):
    user_id: int


class UsersOut(SQLModel):
    data: list[UserOut]
    count: int


# Shared properties
class MovieUserBase(SQLModel):
    movie_id: int
    note: int | None = None
    saved: bool | None = None


# Properties to receive on item creation
class MovieUserCreate(MovieUserBase):
    movie_id: int
    note: int | None = None
    saved: bool | None = None


class MovieUserUpdate(MovieUserBase):
    note: int | None = None
    saved: bool | None = None


# Database model, database table inferred from class name
class MovieUser(MovieUserBase, table=True):
    __tablename__ = "MovieUsers"
    movie_id: int | None = Field(
        default=None, primary_key=True, foreign_key="Movies.movie_id"
    )
    user_id: int | None = Field(
        default=None, foreign_key="Users.user_id", nullable=False
    )
    note: int | None = None
    saved: bool | None = Field(default=False)


# Properties to return via API, id is always required
class MovieUserOut(MovieUserBase):
    movie_id: int | None = None
    note: int | None = None
    saved: bool | None = None


class MovieUsersOut(SQLModel):
    data: list[MovieUserOut]
    count: int


class GenreUserBase(SQLModel):
    genre_id: int


# Properties to receive on item creation
class GenreUserCreate(SQLModel):
    genre_ids: List[int]


class GenreUserUpdate(SQLModel):
    genre_ids: List[int]


# Database model, database table inferred from class name
class GenreUser(SQLModel, table=True):
    __tablename__ = "UserGenre"
    genre_id: Optional[int] = Field(
        default=None, primary_key=True, foreign_key="Genres.genre_id"
    )
    user_id: Optional[int] = Field(
        default=None, foreign_key="Users.user_id", nullable=False
    )


# Properties to return via API, id is always required
class GenreUserOut(GenreUserBase):
    genre_id: int
    user_id: int


class GenreUsersOut(SQLModel):
    data: list[GenreUserOut]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str
