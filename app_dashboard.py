import pandas as pd
import psycopg2
from bokeh.io import curdoc
from bokeh.io import output_file, show
from bokeh.plotting import figure
from bokeh.layouts import column, row, layout
from bokeh.models.widgets import Tabs, Panel
from bokeh.models import DataRange1d, HoverTool, LabelSet
from bokeh.models import ColumnDataSource, DatetimeTickFormatter
from bokeh.models.widgets import DataTable, DateFormatter, TableColumn
from bokeh.models.widgets import Tabs, Panel
from bokeh.models.widgets import PreText
from bokeh.models import ColumnDataSource, DatetimeTickFormatter
from bokeh.models.widgets import DataTable, DateFormatter, TableColumn

hover = HoverTool(tooltips=[("(Y)", "($y{0})")])

connection = psycopg2.connect(user = "postgres", password = "POSTGRES", host = "localhost", port = "5432", database = "postgres")
cursor = connection.cursor()
cursor.execute("SELECT year, pop FROM population;")
record = cursor.fetchall()
data   = pd.DataFrame(record)

plot = figure(plot_width=1200, plot_height=200, title="World Population by Years", tools=['pan,box_zoom',hover])
plot.line(data[:][0], data[:][1], line_width = 2, line_color = "darkmagenta",alpha=0.5)
plot.circle(data[:][0], data[:][1],color="black",fill_color="black", size=8,alpha=0.5)
plot.title.text_font = "calibari light"
plot.title.align = "center"
plot.title.text_color = "navy"
plot.title.text_alpha = 0.8


# Arrange plots and widgets in layouts
l1 = layout([plot],sizing_mode='fixed')
tab1 = Panel(child=l1, title="Stats")
tabs = Tabs(tabs=[tab1])

curdoc().add_root(tabs)