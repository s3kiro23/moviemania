import redis
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

HOST = os.getenv("REDIS_HOST")
PORT = os.getenv("REDIS_PORT")


def connect_to_redis():
    try:
        # Connexion à la base de données Redis
        client = redis.Redis(host=HOST, port=PORT, password=None)

        # Vérification de la connexion
        if client.ping():
            print("Connexion réussie à la base de données Redis")
            return client
        else:
            print("Échec de la connexion à la base de données Redis")

    except Exception as e:
        print(f"Erreur lors de la connexion à Redis : {e}")


def save_recommendations_to_redis(client, user_id, recommendations):
    try:
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        key = f"recommendations:{user_id}:{timestamp}"
        client.set(key, str(recommendations))
        print(
            f"Recommandations enregistrées pour l'utilisateur {user_id} avec la clé {key}"
        )
    except Exception as e:
        print(f"Erreur lors de l'enregistrement des recommandations dans Redis : {e}")
