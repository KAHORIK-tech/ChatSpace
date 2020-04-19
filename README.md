# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, index:true|
|pass|string|null: false|

### Association

- has_many :groups_users
- has_many :groups, through: :groups_users

- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|

### Association
- has_many :messages

- has_many :groups_users
- has_many :users, through: :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|foreign_key: true|
|image|string|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user