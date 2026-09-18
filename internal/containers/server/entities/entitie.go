package entities

import "time"

type ServerInfo struct {
	UpTime       time.Time
	Region       string
	ServicesInfo ServicesInfo
}

type ServicesInfo struct {
	Proxy    Proxy
	Database Database
	Cache    Cache
	Emails   Emails
}

type Proxy struct {
	Working bool
	UpTime  time.Time
}

type Database struct {
	Working bool
	UpTime  time.Time
}

type Cache struct {
	Working bool
	UpTime  time.Time
}

type Emails struct {
	Working bool
	UpTime  time.Time
}

func NewServerInfoWithHealthChecks(serverRegion string, proxyWorking, databaseWorking, cacheWorking, emailsWorking bool, serverUptime, proxyUptime, databaseUptime, cacheUptime, emailsUptime time.Time) *ServerInfo {
	return &ServerInfo{
		UpTime: serverUptime,
		Region: serverRegion,
		ServicesInfo: ServicesInfo{
			Proxy: Proxy{
				Working: true,
				UpTime:  proxyUptime,
			},
			Database: Database{
				Working: databaseWorking,
				UpTime:  databaseUptime,
			},
			Cache: Cache{
				Working: cacheWorking,
				UpTime:  cacheUptime,
			},
			Emails: Emails{
				Working: emailsWorking,
				UpTime:  emailsUptime,
			},
		},
	}
}
