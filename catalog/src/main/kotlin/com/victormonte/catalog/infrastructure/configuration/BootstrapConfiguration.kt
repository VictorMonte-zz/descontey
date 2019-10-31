package com.victormonte.catalog.infrastructure.configuration

import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.context.support.beans

class BootstrapConfiguration : ApplicationContextInitializer<GenericApplicationContext> {
    override fun initialize(context: GenericApplicationContext) = beans {
        bean { com.victormonte.catalog.infrastructure.seeder.init(ref()) }
    }.initialize(context)
}