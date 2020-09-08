<H1>Advanced search options for ARAS PLM</H1>

The patch allows to use parameters like <tt>@today, @username</tt> etc. to be used in Aras searches. <p>
This makes relative date searches like <b>'Items created last week'</b> possible by adding a negative offset:<p>
```xml
<modified_on condition='ge'>@today(-7)</modified_on>
```

Tasks due next week:
```xml
<due_date condition='ge'>@today(+7)</due_date>
```

For list of all available options see the Wiki page.
