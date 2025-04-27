(function() {
  return {
    events: {
      'app.activated': 'onAppActivated'
    },

    onAppActivated: function() {
      const client = this.client;
      client.get('ticket').then(function(data) {
        const ticket = data.ticket;
        const slaPolicy = ticket.sla_policy;
        const slaBreaches = ticket.sla_breaches;

        let timeRemaining = 'N/A';

        if (slaBreaches && slaBreaches.length > 0) {
          const nextBreach = slaBreaches[0];
          const breachTime = new Date(nextBreach.breach_at);
          const now = new Date();
          const diffMs = breachTime - now;

          if (diffMs > 0) {
            const diffMins = Math.floor(diffMs / 60000);
            timeRemaining = `${diffMins} minutes`;
          } else {
            timeRemaining = 'Breached';
          }
        }

        client.invoke('resize', { width: '100%', height: '100px' });
        document.getElementById('sla-time').innerText = `Time to SLA breach: ${timeRemaining}`;
      });
    }
  };
})();
