import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import pandas as pd
from sqlalchemy import create_engine

# إعداد اتصال SQLAlchemy
DATABASE_URL = "mysql+mysqlconnector://root:@localhost/softlapstoredb"
engine = create_engine(DATABASE_URL)

# قراءة البيانات
df = pd.read_sql("SELECT id, name, description FROM products", engine)

# إعداد TF-IDF وKMeans
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(df['description'])

num_clusters = 2
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
kmeans.fit(tfidf_matrix)

# إضافة النتائج إلى DataFrame
df['cluster'] = kmeans.labels_
df['cluster'] = df['cluster'].astype(int)

# حفظ النماذج
joblib.dump(tfidf_vectorizer, 'tfidf_vectorizer.pkl')  # قم بتحديث المسار وفقًا لموقع الحفظ
joblib.dump(kmeans, 'kmeans_model.pkl')  # قم بتحديث المسار وفقًا لموقع الحفظ
