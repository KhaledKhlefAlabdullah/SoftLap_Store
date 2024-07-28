import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import pandas as pd
import mysql.connector

# إعداد اتصال بقاعدة البيانات
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="softlapstoredb"
)

# قراءة بيانات المنتجات من قاعدة البيانات
df = pd.read_sql("SELECT id, name, description FROM products", mydb)

# تجهيز TF-IDF وتحليل التكتلات
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(df['description'])

num_clusters = 2
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
kmeans.fit(tfidf_matrix)
df['cluster'] = kmeans.labels_

# تحويل عمود التكتل إلى نوع int القياسي
df['cluster'] = df['cluster'].astype(int)

# حفظ النموذج والنموذج TF-IDF إلى ملفات
joblib.dump(tfidf_vectorizer, 'tfidf_vectorizer.pkl')
joblib.dump(kmeans, 'kmeans_model.pkl')
