import React from 'react'
import { Card, CardContent } from './card'
import { Calendar, Star, User, MapPin, Clock, Award } from 'lucide-react'
import { Badge } from './badge'
import Link from 'next/link'
import { Button } from './button'

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="group border-emerald-900/20 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header with Avatar and Verification */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className='w-16 h-16 rounded-full bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 flex items-center justify-center flex-shrink-0 ring-2 ring-emerald-900/20 group-hover:ring-emerald-600/30 transition-all duration-300'>
                {doctor.imageUrl ? (
                  <img 
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className='w-16 h-16 rounded-full object-cover'
                  />
                ) : (
                  <User className='h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors'/>
                )}   
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-card flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                <div>
                  <h3 className='font-semibold text-white text-xl leading-tight group-hover:text-emerald-100 transition-colors'>
                    Dr. {doctor.name}
                  </h3>
                  <p className='text-emerald-400 font-medium text-sm'>
                    {doctor.speciality}
                  </p>
                </div>
                
                <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 self-start shrink-0 hover:bg-emerald-500/20 transition-colors">
                  <Award className='h-3 w-3 mr-1.5'/>
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          {/* Experience and Rating */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className='h-4 w-4 text-emerald-400'/>
              <span>{doctor.experience}+ years exp</span>
            </div>
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
            </div>
          </div>

          {/* Description */}
          {doctor.description && (
            <div className='text-sm text-muted-foreground leading-relaxed line-clamp-3'>
              {doctor.description}
            </div>
          )}

          {/* Additional Info */}
          <div className="flex items-center justify-between pt-2 border-t border-emerald-900/20">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className='h-3 w-3 text-emerald-400'/>
              Available Online
            </div>
            <div className="text-xs text-emerald-400 font-medium">
              Next: Today 2:00 PM
            </div>
          </div>

          {/* Action Button */}
          <Button 
            asChild 
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group-hover:scale-[1.02]"
          >
            <Link href={`/doctors/${encodeURIComponent(doctor.speciality)}/${doctor.id}`}>
              <Calendar className='h-4 w-4 mr-2'/>
              View Profile & Book Appointment
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default DoctorCard