import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

data=np.array([[8,2],[9,7],[2,12],[9,1],[10,7],[3,14],[8,1],[1,13]])
kmeans = KMeans(n_clusters=3)
kmeans.fit(data)

print(kmeans.cluster_centers_)
plt.scatter(data[:,0],data[:,1], c=kmeans.labels_, cmap='rainbow')
plt.ylabel("pH")
plt.xlabel("Efectividad")
plt.show()