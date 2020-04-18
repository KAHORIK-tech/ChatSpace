# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, add_index|
|email|string|null: false, add_index|
|pass|string|null: false|

### Association

- has_many :groups_users
- has_many :groups, through: :groups_users

- has_many :messages_users
- has_many :messages, through: :messages_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, add_index|

### Association
- has_many :messages_groups
- has_many :messages, through: :messages_groups

- has_many :groups_users
- has_many :users, through: :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|body|text|null: false|
|image|string||

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messages_usersテーブル

|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :message
- belongs_to :user

## messages_groupテーブル

|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|
|group_id|ineger|null: false, foreign_key: true|

### Association
- belongs_to :message
- belongs_to :group
