import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression  
from sklearn.preprocessing import PolynomialFeatures 
from sklearn.metrics import mean_squared_error, r2_score

# data from 2022-12-31 according to https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv
x = np.asarray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22])[:,np.newaxis]
y = np.asarray([0,38,644,5336,19011,50979,74893,92409,108104,122774,138236,159632,174653,194756,228477,255833,296438,369626,475548,563257,601657,618436,628359])[:,np.newaxis]
plt.scatter(x,y)

poly_degree = 4
polynomial_features = PolynomialFeatures(degree = poly_degree)
x_transform = polynomial_features.fit_transform(x)

model = LinearRegression().fit(x_transform, y)
y_new = model.predict(x_transform)

rmse = np.sqrt(mean_squared_error(y, y_new))
r2 = r2_score(y, y_new)
print('RMSE: ', rmse)
print('R2: ', r2)

x_new_min = 0.0
x_new_max = 23.0

x_new = np.linspace(x_new_min, x_new_max, 23)
x_new = x_new[:,np.newaxis]

x_new_transform = polynomial_features.fit_transform(x_new)
y_new = model.predict(x_new_transform)

plt.plot(x_new, y_new, color='coral', linewidth=3)
plt.grid()
plt.xlim(x_new_min,x_new_max)
plt.ylim(0,750000)
title = 'Degree = {}; RMSE = {}; R2 = {}'.format(poly_degree, round(rmse,2), round(r2,2))
plt.title("Guatemala's COVID-19 Infection Prediction \n " + title, fontsize=10)
plt.xlabel('Months')
plt.ylabel('Cases')
plt.show()